import { TextRouter } from "@src/utilities";

const router = new TextRouter(({ bot, message, remainText }) => {
  bot.sendMessage(message.chat.id, `아리스는 "${remainText}"를 들었습니다.`);
});

export default router;
