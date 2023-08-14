import { z } from 'zod'

export const CampusValidator = z.object({
  name: z.string().min(3).max(21),
})

export const CampusSubscriptionValidator = z.object({
  campusId: z.string(),
})

export type CreateCampusPayload = z.infer<typeof CampusValidator>
export type SubscribeToCampusPayload = z.infer<
  typeof CampusSubscriptionValidator
>
