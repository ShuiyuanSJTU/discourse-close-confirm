import Controller, { inject as controller } from "@ember/controller";
import I18n from "I18n";
import ModalFunctionality from "discourse/mixins/modal-functionality";
import { action } from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";

// Modal that displays confirmation text when user deletes a topic
// The modal will display only if the topic exceeds a certain amount of views
export default Controller.extend(ModalFunctionality, {
  @discourseComputed("model.actionType")
  bodyText() {
    return this.model.actionType == "close"
      ? themePrefix("close_confirm_modal_body")
      : themePrefix("archive_confirm_modal_body");
  },

  @action
  confirm() {
    const { actionType, topic } = this.model;
    if (actionType == "close") {
      topic.toggleStatus("closed").then((result) => {
        topic.set("topic_status_update", result.topic_status_update);
      });
    } else if (actionType == "archive") {
      topic.toggleStatus("archived");
    }
    this.send("closeModal");
  },
});
