import { TextRouter } from "@src/utilities";
import assignRouter from "./assign";

const router = new TextRouter(({ bot, message, remainText, currentPath }) => {
  bot.sendMessage(
    message.chat.id,
    `아리스는 "${remainText}"가 뭔지 이해하지 못했습니다.`
  );
});

router.use("assign", assignRouter);

export default router;
