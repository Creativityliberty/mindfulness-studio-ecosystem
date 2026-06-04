import type { User, UserResource } from "types/user";

export function normalizeUser(resource: UserResource): User {
  return {
    id: resource.id,
    ...resource.attributes,
  };
}
