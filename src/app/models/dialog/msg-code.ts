import {strEnum} from "../../../utils/string-enum";


export const MsgCode = strEnum(
  "label_updated",
  "label_participate",
  "label_wait_contact",
  "label_attend_confirm",
  "label_delete_confirm",
  "label_bind_and_create_user",
  "cloud_quiz_answer",
  "cloud_enrolled",
  "error_no_quiz_event",
  "error_participation_times_over",
  "error_not_allow_participation",
  "error_already_enrolled",
  "error_reached_course_capacity",
  "error_user_not_exist",
  "error_no_login",
  "error_wechat"
)

export type MsgCode = keyof typeof MsgCode

