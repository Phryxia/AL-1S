import { TextRouter } from "@src/utilities";

const router = new TextRouter(({ bot, message, remainText }) => {
  if (remainText) {
    bot.sendMessage(
      message.chat.id,
      `아리스는 이해했습니다.\n당신의 이름은 ${remainText}입니다.`
    );
    return;
  }

  bot.sendMessage(message.chat.id, `아리스는 당신의 이름을 알고 싶습니다.`);
});

export default router;
