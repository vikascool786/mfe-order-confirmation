import {
  SPECIAL_INSTRUCTION_EMAIL,
  SPECIAL_INSTRUCTION_MESSAGE,
  SPECIAL_INSTRUCTION_NAME,
  SPECIAL_INSTRUCTION_PRODUCT_INFORMATION,
} from "../constants/InstructionConstants";

export function getSpecialInstructionMessage(instructionId: number) {
  switch (instructionId) {
    case SPECIAL_INSTRUCTION_PRODUCT_INFORMATION:
      return "";
    case SPECIAL_INSTRUCTION_EMAIL:
      return "Email: ";
    case SPECIAL_INSTRUCTION_MESSAGE:
      return "Message: ";
    case SPECIAL_INSTRUCTION_NAME:
      return "Name: ";
    default:
      return "";
  }
}
