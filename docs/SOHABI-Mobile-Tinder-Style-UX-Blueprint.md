# SOHABI Mobile-Only Tinder-Style UX Blueprint

## Purpose
SOHABI should become a mobile-only social discovery app inspired by Tinder's proven interaction model: fast onboarding, one-profile-at-a-time discovery, swipe decisions, mutual matches, real-time chat, nearby places, and safety-first trust layers.

This document translates the existing SOHABI backend into a complete frontend page and UX plan. It is intentionally frontend-focused: screens, states, flows, data contracts, gestures, component behavior, and implementation order.

Important: do not copy Tinder branding, exact visual assets, or proprietary UI. The target is Tinder-like UX structure and interaction psychology, expressed with SOHABI's warm coffee/friendship identity.

## Public Research Summary
Sources reviewed through web search:

- Tinder onboarding flow on iOS: https://pageflows.com/post/ios/onboarding/tinder/
- Tinder account creation docs: https://www.help.tinder.com/hc/en-us/articles/115003356706-Create-a-Tinder-Account
- UX Collective Tinder design breakdown: https://uxdesign.cc/breaking-down-the-brilliant-and-simple-design-of-tinder-cc4e07859c5e
- Built In swipe UX analysis: https://builtin.com/articles/tinder-swipe-design
- Tinder safety center: https://www.help.tinder.com/hc/en-us/articles/360039734112-Tinder-Safety-Center
- Tinder photo verification: https://www.help.tinder.com/hc/en-us/articles/360034941812-Photo-Verification
- Tinder Explore launch and feature evolution: https://techcrunch.com/2021/09/09/tinder-adds-a-new-home-for-interactive-social-features-with-launch-of-tinder-explore/
- Tinder Explore 2025 categories: https://techcrunch.com/2025/02/06/tinder-updates-explore-with-new-categories-to-help-daters-find-users-with-similar-dating-intentions/
- Tinder subscription tiers: https://tinder.com/feature/subscription-tiers

Key takeaways:

1. Tinder's core UX is not a feed. It is a focused card stack that forces one decision at a time.
2. Swipe gestures reduce clutter and make the action feel physical: right keeps, left discards, upward/special action elevates intent.
3. Onboarding uses progressive disclosure: one task per screen, little text, high momentum.
4. Phone/email/social login comes before profile setup; verification and permissions are introduced with priming screens.
5. Discovery cards are visual-first: large photo, name/age, distance/city, verification, common interests.
6. Matches are double opt-in. Chat only becomes available after mutual interest.
7. Premium mechanics are embedded around the discovery loop: rewind, boost, super like, unlimited swipes, advanced filters, see who liked you.
8. Safety is always reachable from profile, chat, and settings: verification, block/report, safety center, message reporting.
9. Explore has evolved into a hub of intent-based tiles: Coffee Date, New Friends, Free Tonight, serious/short-term intent, interests, interactive prompts.
10. Mobile-only constraints matter: bottom navigation, thumb-first actions, safe-area-aware layouts, no desktop app experience.

## SOHABI Backend Capability Map

### Auth
Backend files:
- `SOHABI-backend/src/modules/auth/auth.controller.ts`
- `SOHABI-backend/src/modules/auth/dto/register.dto.ts`
- `SOHABI-backend/src/modules/auth/dto/login.dto.ts`
- `SOHABI-backend/src/modules/auth/dto/verify-otp.dto.ts`

Endpoints:
- `POST /auth/register`: email or phone, password, birthdate, acceptedTerms.
- `POST /auth/login`: email or phone, password.
- `POST /auth/send-otp`: phone.
- `POST /auth/verify-phone`: phone, 6 digit OTP.
- `POST /auth/reset-password`: email.
- `POST /auth/oauth/:provider`: google/facebook auth URL.
- `POST /auth/oauth/callback`: OAuth completion.

Frontend implications:
- Current mobile auth pages can later be wired directly.
- Register flow already has required birthdate and terms.
- OTP and reset pages are valid future screens.
- Apple login is frontend-only for now; backend currently exposes Google/Facebook provider DTOs.

### Profile And Onboarding
Backend files:
- `SOHABI-backend/src/modules/profiles/profile.controller.ts`
- `SOHABI-backend/src/modules/profiles/interfaces/profile.interface.ts`
- `SOHABI-backend/src/modules/profiles/dto/create-profile.dto.ts`
- `SOHABI-backend/src/modules/profiles/dto/update-profile.dto.ts`
- `SOHABI-backend/src/modules/profiles/dto/photo.dto.ts`
- `SOHABI-backend/src/modules/profiles/dto/interests.dto.ts`

Main data fields:
- `username`, `displayName`, `birthdate`, `age`, `gender`
- `bio`, `city`, `governorate`, `coordinates`
- `languages`: `arabic`, `french`, `english`
- `interests`: up to 20
- `photos`: up to 9
- `completionPercentage`
- `isVerified`, `verificationMethod`, `visibility`
- `showOnlineStatus`, `showLastSeen`, `isPremium`

Endpoints:
- `POST /profiles`: create profile.
- `GET /profiles/me`: my profile.
- `PATCH /profiles`: update profile.
- `POST /profiles/photos`: upload photo.
- `DELETE /profiles/photos/:id`: delete photo.
- `PUT /profiles/photos/reorder`: reorder photos.
- `GET /profiles/interests`: all interests.
- `GET /profiles/interests/categories`: grouped interests.
- `PUT /profiles/me/interests`: set interests.
- `POST /profiles/verify`: start verification.
- `POST /profiles/verify/complete`: complete verification.
- `GET /profiles/verify/status`: status.

Frontend implications:
- Onboarding should map 1:1 to profile DTOs.
- Photos and interests must be prominent because they power discovery cards.
- Completion percentage can power profile checklist/gamification.
- Verification is a trust layer like Tinder photo verification.

### Discovery And Matching
Backend files:
- `SOHABI-backend/src/modules/discovery/discovery.controller.ts`
- `SOHABI-backend/src/modules/discovery/interfaces/discovery-profile.interface.ts`
- `SOHABI-backend/src/modules/discovery/dto/swipe.dto.ts`
- `SOHABI-backend/src/modules/discovery/dto/discovery-preferences.dto.ts`

Discovery profile shape:
- `id`, `userId`, `username`, `displayName`, `age`, `gender`
- `bio`, `city`, `governorate`, `distance`
- `photos`, `interests`, `commonInterests`
- `isOnline`, `isVerified`, `matchScore`

Endpoints:
- `GET /discovery/profiles?limit=10`
- `POST /discovery/swipe`: `targetUserId`, `action`: `like | pass | super_like`
- `GET /discovery/swipe-count`
- `POST /discovery/rewind`
- `GET /discovery/preferences`
- `PUT /discovery/preferences`

Frontend implications:
- The main screen should be a swipe deck powered by `IDiscoveryProfile`.
- Actions: pass, like, super-like, rewind.
- Swipe count enables free-tier limits and upgrade prompts.
- Preferences screen should be accessible directly from Discovery, not buried.

### Matches
Backend files:
- `SOHABI-backend/src/modules/matches/match.controller.ts`
- `SOHABI-backend/src/modules/matches/interfaces/match.interface.ts`

Data fields:
- `IMatchSummary`: matched user profile, primary photo, verification, online state, conversationId, matchedAt, unreadCount, mute state.

Endpoints:
- `GET /matches?page&limit`
- `GET /matches/:id`
- `DELETE /matches/:id`: unmatch
- `PUT /matches/:id/mute`

Frontend implications:
- Matches page: grid/list of mutual matches.
- Match detail: profile preview + start chat.
- New match modal after swipe should link into chat/conversation.

### Chat
Backend files:
- `SOHABI-backend/src/modules/chat/chat.controller.ts`
- `SOHABI-backend/src/modules/chat/interfaces/conversation.interface.ts`
- `SOHABI-backend/src/modules/chat/interfaces/message.interface.ts`

Data fields:
- Conversation types: `direct`, `community`, `event`, `voice_room`
- Participants include username, displayName, primaryPhoto/avatar, online state.
- Message types: `text`, `image`, `voice`, `video`, `gif`, `system`
- Message states: `sent`, `delivered`, `read`
- Reactions supported.

Endpoints:
- `GET /conversations`
- `POST /conversations/direct`
- `GET /conversations/:id/messages`
- `POST /conversations/:id/messages`
- `PUT /conversations/:id/read`
- `POST /messages/:id/reactions`
- `POST /users/:id/block`
- `GET /users/blocked`

Frontend implications:
- Inbox page mirrors Tinder messages, but with SOHABI coffee/context cues.
- Conversation page needs media, reactions, read receipts, block/report actions.
- Chat should be locked behind match or context-driven communities/events.

### Cafe Mode
Backend files:
- `SOHABI-backend/src/modules/cafe-mode/cafe-mode.controller.ts`
- `SOHABI-backend/src/modules/cafe-mode/interfaces/cafe.interface.ts`

Data fields:
- Cafes have name, address, city/governorate, coordinates, category, photos, amenities, rating, partner status, currentCheckins, distance.

Endpoints:
- `GET /cafes/nearby`
- `GET /cafes/search`
- `GET /cafes/current-checkin`
- `GET /cafes/:id`
- `POST /cafes/:id/checkin`
- `DELETE /cafes/checkout`
- `GET /cafes/:id/checkins`
- `GET /checkins/nearby`

Frontend implications:
- SOHABI's Explore should heavily feature Coffee Date, Study Table, Nearby Cafes.
- Cafe cards can become match context cards.
- Check-ins can be used for “people nearby now” discovery.

### Friend Map
Backend files:
- `SOHABI-backend/src/modules/friend-map/friend-map.controller.ts`
- `SOHABI-backend/src/modules/friend-map/interfaces/friend-map.interface.ts`

Data fields:
- Friend location: displayName, avatar, city/governorate, lat/lng, accuracy, heading/speed, live share, stale status, distance, expiry.

Endpoints:
- `GET /friend-map/settings`
- `GET /friend-map/friends`
- `POST /friend-map/location`
- `DELETE /friend-map/location`
- `POST /friend-map/live-sessions`
- `DELETE /friend-map/live-sessions/:viewerId`

Frontend implications:
- Map tab should be friend-only, permission-led, not a public discovery map.
- Use for safe arrival, cafe meetups, temporary live share.

### Gems, Subscriptions, Premium
Backend files:
- `SOHABI-backend/src/modules/gems/gems.controller.ts`
- `SOHABI-backend/src/modules/subscriptions/interfaces/subscription.interface.ts`

Features:
- Gems balance, packages, purchase, transactions.
- Gifts, boost, super-like, earnings/withdraw.
- Subscription features: unlimited swipes, see who viewed, profile boost, custom themes, advanced filters, rewind, invisible mode, priority likes.

Frontend implications:
- Premium/monetization maps almost exactly to Tinder mechanics.
- Keep premium UI native to discovery loop: boost, super-like, rewind, advanced filters, unlimited swipes.

### Communities, Events, Vibe Checks, Notifications
Backend supports:
- Communities: groups, posts, comments, members, trending.
- Events: nearby/my events, RSVP, attendees, waitlist, event chat, reviews.
- Vibe checks: daily dual-photo/caption/location posts, reactions, schedule.
- Notifications: match, message, vibe_check, streak, community, event, system, gift, profile_view.

Frontend implications:
- Tinder Explore equivalent should become SOHABI Explore: Coffee Date, New Friends, Study Session, Free Tonight, Events, Vibe Check, Communities.
- Notifications can drive re-engagement loops.

## Mobile-Only Product Rule
All app pages after landing must be phone-first and hidden on desktop/tablet.

Rules:
- Auth/onboarding/app screens: visible only below `md`.
- Desktop/tablet: show a polished “SOHABI is mobile-only” blocker with QR/app-store style guidance.
- Layout target widths: 360, 375, 390, 414, 430 px.
- Use `min-h-dvh`, safe-area top/bottom, no fixed desktop widths.
- Bottom navigation must respect `env(safe-area-inset-bottom)`.
- Touch targets minimum 44 px, primary CTAs 52-56 px.
- No hover-dependent interactions.

## App Information Architecture

### Public Web
1. Landing page
2. Login
3. Register
4. Verify Phone
5. Forgot Password
6. Reset Password

### Onboarding
1. Start / Welcome
2. Login or Sign Up
3. Verify phone/email
4. Name
5. Birthday
6. Gender
7. Languages
8. Intent / What are you looking for?
9. Discovery preferences
10. Interests
11. Photos
12. Location permission priming
13. Notification permission priming
14. Safety pledge
15. Swipe tutorial
16. First discovery deck

### Authenticated App Tabs
Recommended 5-tab bottom navigation:

1. Discover
2. Explore
3. Matches
4. Chat
5. Profile

Optional floating affordances:
- Top-left profile/verification status.
- Top-right filters, boost, safety, notifications depending on screen.

## Onboarding Design Blueprint

### 1. Welcome / Start
Goal: set emotional context, not sell features.

UI:
- SOHABI icon once at top.
- Big title: “Find your people over coffee.”
- Subtext: nearby friends, safe public plans, cafe-first moments.
- Primary: “Create account”
- Secondary: “Login”
- Social buttons: Apple, Google, Facebook.

Backend mapping:
- Auth endpoints only.

UX notes:
- One primary CTA.
- Avoid long marketing copy; save detail for landing page.

### 2. Phone / Email Entry
Tinder pattern: phone-first, email as alternative.

UI:
- Segmented control: Phone / Email.
- Phone helper: `+216XXXXXXXX`.
- Continue button.
- Security note: “We will never show your phone on your profile.”

Backend mapping:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/send-otp`

### 3. OTP Verification
UI:
- 6 digit OTP row.
- Resend countdown.
- Edit phone link.
- Continue button.

Backend mapping:
- `POST /auth/verify-phone`.

### 4. Basic Identity
Screen sequence:
- Name: `displayName`
- Username: `username`
- Birthday: `birthdate`, 16+ validation
- Gender: `male | female | other`
- Languages: Arabic, French, English

Backend mapping:
- `POST /profiles` fields.

UX:
- One field per screen for momentum.
- Show progress indicator, e.g. “3 of 10”.
- Explain irreversible fields if any become immutable.

### 5. Intent And Preferences
SOHABI-specific intent should replace dating-only framing.

Intent chips:
- Coffee friends
- Study buddy
- Walks nearby
- Language exchange
- Events and groups
- New city friends

Backend storage:
- Could map to interests initially.
- Future field may be needed for intent.

Discovery preferences:
- Age range: 16-100 backend supports.
- Genders.
- Max distance: 1-500 km.
- Online only.
- Interest filter up to 10.

Backend mapping:
- `PUT /discovery/preferences`.

### 6. Interests
UI:
- Category chips with icons.
- Up to 20 profile interests.
- Common interests later appear on discovery cards.

Backend mapping:
- `GET /profiles/interests/categories`
- `PUT /profiles/me/interests`

### 7. Photos
Tinder-style photo setup is critical.

UI:
- 9 slots grid.
- First slot marked “Primary”.
- Add photo cards with camera/gallery choices.
- Drag reorder later.
- Moderation status badges: pending, approved, rejected.

Backend mapping:
- `POST /profiles/photos`
- `PUT /profiles/photos/reorder`
- `DELETE /profiles/photos/:id`

UX:
- Require at least 2 photos before full discovery.
- Encourage 4+ for completion score.
- Show profile completion reward.

### 8. Permissions Priming
Before browser/native permission prompts, show benefit screens.

Location copy:
- “SOHABI uses location to show nearby friends and safe cafe plans.”

Notifications copy:
- “Get match, message, and plan reminders only when they matter.”

Friend map copy:
- “Location sharing is friend-only, temporary, and always in your control.”

Backend mapping:
- Profiles coordinates.
- Friend map settings/location.
- Notifications device token and preferences.

### 9. Safety Pledge
UI:
- Short pledge card.
- Public places first.
- Respect boundaries.
- Block/report anytime.
- Location sharing is opt-in.

Backend mapping:
- Moderation reports.
- Chat block user.
- Age/profile verification.

### 10. Swipe Tutorial
Tinder uses guide overlays near the start of discovery.

SOHABI tutorial:
- Swipe right: “Say hi” / “Interested”
- Swipe left: “Pass”
- Swipe up or blue action: “Coffee invite” / “Super like”
- Tap photo: next photo
- Tap info: open full profile sheet
- Long press or shield: report/safety

Backend mapping:
- `POST /discovery/swipe`
- `POST /gems/super-like`

## Main App UX

## 1. Discover Tab
This is the core Tinder-style screen.

### Page Structure
- Safe-area header.
- Top row: SOHABI mark or “Discover”, filter icon, safety/boost/gems shortcut.
- Card stack fills 70-78% of viewport.
- Action bar near bottom.
- Bottom nav fixed.

### Discovery Card Data
Use `IDiscoveryProfile`:
- Primary photo as full bleed.
- Name and age: `displayName`, `age`.
- Verification badge: `isVerified`.
- Online dot: `isOnline`.
- Distance/city: `distance`, `city`, `governorate`.
- Common interests: `commonInterests` chips.
- Match score can be hidden or translated: “Strong coffee match”.
- Photo carousel dots from `photos`.

### Gestures
- Drag right = like.
- Drag left = pass.
- Drag up = coffee invite/super-like variant.
- Tap right half = next photo.
- Tap left half = previous photo.
- Tap lower info = profile detail sheet.
- Swipe down from detail = close.

### Visual Feedback
- Right overlay: green/cream “LIKE” or “SAY HI”.
- Left overlay: muted “PASS”.
- Up overlay: blue/sand “COFFEE”.
- Thresholds should account for velocity, not only distance.
- Card rotates lightly based on horizontal drag.
- Next card scales from 0.96 to 1 while top card leaves.

### Action Bar
Tinder-like but SOHABI branded:
- Rewind: amber circular button.
- Pass: charcoal/gray circular button.
- Coffee / Super Like: blue/sand circular button.
- Like: green or warm primary button.
- Boost: purple/gem circular button.

Backend mapping:
- Pass/like/super_like: `POST /discovery/swipe`
- Rewind: `POST /discovery/rewind`
- Swipe count: `GET /discovery/swipe-count`
- Boost/super-like: `POST /gems/boost`, `POST /gems/super-like`

### Empty States
- No profiles nearby.
- Filters too narrow.
- Daily swipes used.
- Profile incomplete.
- Location missing.

Each empty state should include one clear CTA.

## 2. Profile Detail Sheet
Opened from discovery card without leaving the stack.

UI:
- Full-screen or 90% height sheet.
- Photos carousel.
- Name/age/verification.
- Bio.
- Languages.
- Interests/common interests.
- City/distance.
- Cafe-friendly prompts: “Usually free for coffee after 5.”
- Actions: like, pass, coffee invite.
- Safety actions below: report/block.

Backend mapping:
- `GET /profiles/:id`
- `POST /users/:id/block`
- `POST /reports`

UX:
- Preserve discovery stack position.
- Close returns exactly to same card.

## 3. Match Moment
Triggered when swipe result returns `matched: true`.

UI:
- Full-screen celebration modal.
- Two profile photos overlapping.
- “You and Nour both want coffee.”
- CTA: Send message.
- Secondary: Keep discovering.

Backend mapping:
- Swipe response `matchId`.
- `GET /matches/:id`.
- `POST /conversations/direct`.

Motion:
- Brief 500-700ms celebration allowed.
- Avoid long confetti.
- Respect reduced motion.

## 4. Explore Tab
Tinder Explore equivalent, but SOHABI-specific.

### Purpose
Help users discover by context instead of endless swiping.

### Tiles
- Coffee Date
- Study Table
- Language Exchange
- Free Tonight
- New Friends
- Walking Group
- Cafe Nearby
- Events This Week
- Vibe Check
- Communities
- Verified Only
- Online Now

### Backend Mapping
- Coffee/cafes: `/cafes/nearby`, `/cafes/search`, `/checkins/nearby`
- Events: `/events`, `/events/nearby`
- Communities: `/communities`, `/communities/trending`
- Vibe checks: `/vibe-checks/today`, `/vibe-checks/friends`
- Discovery filters: `/discovery/preferences`

### UX
- 2-column tile grid.
- Each tile opens a contextual deck or list.
- “Coffee Date” should open a filtered discovery stack, not a static list.
- “Free Tonight” can become high-intent quick meetup mode.

## 5. Matches Tab
Purpose: all mutual matches, separate from messages.

UI:
- Horizontal “New Matches” carousel.
- Match list grouped by recent/active.
- Search/filter: online, nearby, unread, muted.
- Empty: “Your next coffee friend starts in Discover.”

Backend mapping:
- `GET /matches`
- `PUT /matches/:id/mute`
- `DELETE /matches/:id`

## 6. Chat Tab
Tinder messages equivalent plus SOHABI planning.

### Inbox
Data:
- `IConversation` with participants, lastMessage, unreadCount.

UI:
- Search.
- Conversations list.
- Unread badges.
- Online dots.
- Context chips: match, event, community, voice room.

### Conversation
Data:
- `IMessage`: text/image/voice/video/gif/system, reactions, read state.

UI:
- Header: avatar, name, online, safety shield.
- Message bubbles.
- Media composer.
- Coffee plan quick actions: “Suggest cafe”, “Pick time”, “Share route”.
- Long press message: react, report, delete.

Backend mapping:
- `GET /conversations`
- `GET /conversations/:id/messages`
- `POST /conversations/:id/messages`
- `PUT /conversations/:id/read`
- `POST /messages/:id/reactions`
- `POST /chat/media`

## 7. Cafe Mode
This is SOHABI's strongest differentiator from Tinder.

Screens:
- Nearby cafes map/list.
- Cafe detail.
- Active check-in.
- People checked in.
- Partner cafe offer.
- Review cafe.

UI:
- Cafe card with photos, rating, distance, open/closed, current check-ins.
- “Meet here” CTA inside chat/discovery profile.
- “Check in” CTA.

Backend mapping:
- `/cafes/*`, `/checkins/nearby`.

## 8. Friend Map
Not Tinder-like public discovery. It should be trust-based.

Screens:
- Map overview.
- Friend live session sheet.
- Share location settings.
- Temporary live share flow.
- Stale/offline states.

Backend mapping:
- `/friend-map/settings`
- `/friend-map/friends`
- `/friend-map/location`
- `/friend-map/live-sessions`

UX:
- Never imply strangers can track you.
- Use “trusted friends only”.
- Show expiry timers clearly.

## 9. Profile Tab
Screens:
- My profile preview.
- Edit profile.
- Photos manager.
- Interests/languages.
- Verification.
- Discovery preferences.
- Safety center.
- Premium/gems.
- Settings.

Backend mapping:
- `/profiles/me`
- `/profiles/photos`
- `/profiles/me/interests`
- `/profiles/verify`
- `/discovery/preferences`
- `/subscriptions/*`
- `/gems/*`

UX:
- Completion percentage displayed as checklist.
- Verification shown as trust badge.
- Photos manager has Tinder-like slots.
- Settings are not the place for high-frequency discovery filters; place filters in Discover too.

## 10. Premium And Monetization
Tinder-inspired but SOHABI-branded.

Features supported by backend:
- Unlimited swipes.
- Rewind.
- Profile boost.
- Advanced filters.
- See who viewed.
- Invisible mode.
- Priority likes.
- Gems for super likes/gifts.

Screens:
- Premium overview.
- Gems shop.
- Boost modal.
- Super-like confirmation.
- Gift picker.
- Feature locked bottom sheet.

UX:
- Upsells should be contextual.
- Rewind lock appears after trying to rewind.
- Boost lock appears from Discover action.
- Advanced filters lock appears in filter sheet.

## 11. Safety Center
Tinder safety center pattern adapted to SOHABI.

Screens:
- Safety home.
- Verification guide.
- Meetup safety tips.
- Public-place reminders.
- Report user.
- Blocked users.
- Privacy/location sharing.
- Emergency/help resources.

Backend mapping:
- Profile verification endpoints.
- Moderation/report endpoints.
- Chat block endpoints.
- Friend map settings.

UX:
- Safety shield accessible in chat header.
- Report/block accessible from profile detail sheet.
- Avoid scary tone; be clear and practical.

## Mobile UI System

### Visual Style
- Mobile-first, iOS-inspired.
- SF Pro only.
- Light theme: cream paper, white cards, charcoal ink.
- Dark theme: warm charcoal, cream text, sand borders.
- Rounded cards: 24-36 px.
- Buttons: 52-56 px height.
- Bottom sheets: 28-36 px top radius.
- Blur/glass used for nav and cards, not heavy everywhere.

### Navigation
Bottom tab bar:
- Discover
- Explore
- Matches
- Chat
- Profile

Rules:
- Safe-area bottom padding.
- Icons + optional labels.
- Highlight active tab.
- Keep destructive/safety actions out of main nav.

### Motion
- Swipe cards: physics-like drag, spring settle.
- Button press: scale 0.985.
- Sheets: 220-300ms ease-out or spring.
- Tab indicators: GSAP or CSS transform, 200-320ms.
- Match modal: slightly more celebratory but under 700ms.
- Respect reduced motion.

### Loading States
- Discovery deck shimmer.
- Skeleton profile card.
- Chat message shimmer.
- Cafes list skeleton.
- Empty states with one CTA.

### Accessibility
- Touch targets >=44 px.
- Labels visible on forms.
- Color not only signal for swipe actions; include text labels.
- Report/block accessible via buttons, not hidden gestures only.
- Screen reader labels for action buttons.
- Do not disable zoom.

## Data Contract To UI Mapping

| Backend Data | UI Placement |
| --- | --- |
| `IDiscoveryProfile.photos` | Discovery card carousel |
| `displayName`, `age` | Card title |
| `city`, `governorate`, `distance` | Card location row |
| `commonInterests` | Card chips |
| `isVerified` | Trust badge |
| `isOnline` | Online dot |
| `matchScore` | Optional “strong match” label |
| `ISwipeCount.remaining` | Swipe limit chip / upgrade prompt |
| `IMatchSummary.unreadCount` | Matches/chat badges |
| `IConversation.lastMessage` | Inbox preview |
| `ICafe.currentCheckins` | Cafe social proof |
| `IFriendMapLocation.expiresAt` | Live share countdown |
| `ISubscriptionFeatures.rewind` | Rewind lock/unlock state |
| `IGemBalance` | Gems counter / super-like affordability |

## Page Inventory For Frontend Implementation

### Auth
- `/login`
- `/register`
- `/verify-phone`
- `/forgot-password`
- `/reset-password`

### Onboarding
- `/onboarding/welcome`
- `/onboarding/name`
- `/onboarding/birthday`
- `/onboarding/gender`
- `/onboarding/languages`
- `/onboarding/intent`
- `/onboarding/preferences`
- `/onboarding/interests`
- `/onboarding/photos`
- `/onboarding/location`
- `/onboarding/notifications`
- `/onboarding/safety`
- `/onboarding/tutorial`

### App Tabs
- `/app/discover`
- `/app/explore`
- `/app/matches`
- `/app/chat`
- `/app/profile`

### Deep Screens
- `/app/profile/edit`
- `/app/profile/photos`
- `/app/profile/verification`
- `/app/discover/preferences`
- `/app/chat/[conversationId]`
- `/app/matches/[matchId]`
- `/app/cafes`
- `/app/cafes/[cafeId]`
- `/app/events`
- `/app/events/[eventId]`
- `/app/communities`
- `/app/communities/[communityId]`
- `/app/friend-map`
- `/app/safety`
- `/app/premium`
- `/app/gems`
- `/app/settings`

All routes above except landing must be mobile-only.

## Component Plan

### Core App Shell
- `MobileOnlyShell`: already exists for auth; extend for app pages.
- `MobileAppShell`: authenticated layout with bottom tabs.
- `MobileDesktopBlocker`: reusable desktop blocker.

### Discovery Components
- `SwipeDeck`
- `DiscoveryCard`
- `DiscoveryCardPhotoCarousel`
- `SwipeActionOverlay`
- `DiscoveryActionBar`
- `MatchModal`
- `ProfileDetailSheet`
- `DiscoveryPreferencesSheet`
- `SwipeLimitSheet`

### Onboarding Components
- `OnboardingShell`
- `StepProgress`
- `PhotoSlotGrid`
- `InterestChipGrid`
- `PermissionPrimer`
- `SafetyPledgeCard`
- `SwipeTutorialOverlay`

### Social Components
- `MatchesCarousel`
- `MatchListItem`
- `ConversationListItem`
- `MessageBubble`
- `ChatComposer`
- `CoffeePlanComposer`

### Explore Components
- `ExploreTileGrid`
- `ExploreTile`
- `CafeCard`
- `EventCard`
- `CommunityCard`
- `VibeCheckCard`

### Monetization Components
- `PremiumFeatureLockSheet`
- `GemsBalancePill`
- `BoostSheet`
- `GiftPickerSheet`
- `SuperLikeConfirmSheet`

## Implementation Phases

### Phase 1: Foundations
1. Create `MobileAppShell` with desktop blocker and bottom nav.
2. Create shared mock data fixtures matching backend interfaces.
3. Create typed frontend models that mirror backend interface names.
4. Add route groups for onboarding and app.

### Phase 2: Onboarding
1. Build onboarding shell and progress.
2. Implement name, birthday, gender, languages.
3. Implement intent, preferences, interests.
4. Implement photo manager placeholder.
5. Implement permissions and tutorial.

### Phase 3: Discovery Core
1. Implement swipe deck with local fixture data.
2. Implement card photo tap zones.
3. Implement action bar.
4. Implement match modal.
5. Implement detail sheet.
6. Implement empty states.

### Phase 4: Social Tabs
1. Matches page.
2. Chat inbox.
3. Conversation screen.
4. Profile page.

### Phase 5: SOHABI Differentiators
1. Explore tiles.
2. Cafe mode.
3. Friend map.
4. Vibe checks.
5. Events/communities.

### Phase 6: Premium/Safety
1. Premium and gems screens.
2. Boost/super-like sheets.
3. Safety center.
4. Verification flow.

### Phase 7: API Wiring Later
When design is stable, wire endpoints page by page:
1. Auth.
2. Profile onboarding.
3. Discovery profiles/swipes.
4. Matches/chat.
5. Cafe/explore.
6. Premium/gems.

## Recommended Immediate Next Build
Build in this order:

1. `MobileAppShell` with bottom nav and desktop blocker.
2. `/onboarding/*` static pages from current auth state.
3. `/app/discover` with fixture deck based on `IDiscoveryProfile`.
4. Swipe card animation and action bar.
5. Match modal and profile detail sheet.
6. `/app/explore` tile grid.
7. `/app/matches` and `/app/chat` fixtures.

This gives SOHABI the Tinder-like product feel before any backend wiring.

## UX Principles To Enforce

1. One primary action per screen.
2. One profile at a time in discovery.
3. Prefer gestures, but always provide visible fallback buttons.
4. Keep filters close to discovery.
5. Keep safety always reachable.
6. Keep cafe/meetup context central so SOHABI is not a generic Tinder clone.
7. Design every app route mobile-only.
8. Keep visual identity SOHABI: warm, safe, social, cafe-first.
9. Use backend field names in fixture data to reduce future API mapping work.
10. Do not overbuild desktop app pages.
