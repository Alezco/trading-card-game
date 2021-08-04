import { Card } from "@/models/Card";

export const removeHandCard = (hand: Card[], cardId: string) => {
  const updatedHand = [...hand];
  const index = updatedHand.findIndex(({ id }) => id === cardId);
  if (index >= 0) updatedHand.splice(index, 1);
  return updatedHand;
};
