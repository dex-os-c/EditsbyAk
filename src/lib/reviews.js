// Review storage, abstracted behind two functions so the backend can be
// swapped later without touching any component.
//
// Right now this reads/writes localStorage, which means reviews are only
// visible in the browser that posted them -- fine for a demo, not fine for
// "visible to every visitor" (which the review form promises). To make
// reviews actually public, point SUBMIT/FETCH at a real backend -- e.g. the
// same Supabase pattern used for Mechatrox: a `reviews` table with public
// INSERT + SELECT policies, swapped in here, and nothing else in the app
// needs to change.
const LOCAL_KEY = 'ak_edits_reviews_local'

function readLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLocal(list) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
  } catch {
    // localStorage unavailable (private mode, quota, etc.) -- the review
    // still renders for this session via React state, it just won't
    // survive a reload. Not worth surfacing an error for.
  }
}

export async function fetchReviews() {
  return readLocal()
}

export async function postReview(review) {
  const list = readLocal()
  const withId = { ...review, id: crypto.randomUUID(), date: Date.now() }
  const next = [...list, withId]
  writeLocal(next)
  return next
}
