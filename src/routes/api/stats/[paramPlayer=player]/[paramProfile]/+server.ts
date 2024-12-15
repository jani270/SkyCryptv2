import { fetchMuseum, fetchPlayer, getProfile } from "$lib/server/lib";
import { getStats } from "$lib/server/stats";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const timeNow = Date.now();
  const { paramPlayer, paramProfile } = params;

  const [profile, player] = await Promise.all([getProfile(paramPlayer, paramProfile), fetchPlayer(paramPlayer)]);
  const museum = await fetchMuseum(profile.profile_id);

  const stats = await getStats(profile, player, { museum });

  console.log(`/api/stats/${paramPlayer} took ${Date.now() - timeNow}ms`);
  return json(stats);
};
