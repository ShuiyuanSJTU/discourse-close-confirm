import { apiInitializer } from "discourse/lib/api";
import showModal from "discourse/lib/show-modal";

export default apiInitializer("0.11.1", (api) => {
  api.modifyClass("controller:topic", {
    pluginId: "discourse-close-confirm",

    actions: {
      toggleArchived() {
        const topic = this.model;
        const currentUser = this.currentUser;
        if (
          topic.archived ||
          currentUser.staff ||
          currentUser.trust_level == 4
        ) {
          topic.toggleStatus("archived");
        } else {
          showModal("closeConfirmModal", {
            model: { topic, actionType: "archive" },
            title: themePrefix("archive_confirm_modal_title"),
          });
        }
      },

      toggleClosed() {
        const topic = this.model;
        const currentUser = this.currentUser;
        if (topic.closed || currentUser.staff || currentUser.trust_level == 4) {
          topic.toggleStatus("closed").then((result) => {
            topic.set("topic_status_update", result.topic_status_update);
          });
        } else {
          showModal("closeConfirmModal", {
            model: { topic, actionType: "close" },
            title: themePrefix("close_confirm_modal_title"),
          });
        }
      },
    },
  });
});
