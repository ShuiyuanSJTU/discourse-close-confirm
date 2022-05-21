import { apiInitializer } from "discourse/lib/api";
import showModal from "discourse/lib/show-modal";

export default apiInitializer("0.11.1", (api) => {
  api.modifyClass("controller:topic", {
    pluginId: "discourse-close-confirm",

    actions: {
      toggleArchived() {
        const topic = this.model;
        const currentUser = this.currentUser;
        if (topic.archived || currentUser.canManageTopic) {
          this._super(...arguments);
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
        if (topic.closed || currentUser.canManageTopic) {
          this._super(...arguments);
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
