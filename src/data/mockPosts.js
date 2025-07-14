const mockPosts = [
  {
    id: "post_1",
    title: "Spam link",
    content: "Hey everyone! Check out this unbelievable site where you can double your money overnight. Totally legit!",
    author: { username: "jason_lee", id: "user_1" },
    reportedReason: "Spam",
    reportedAt: "2025-07-08",
    status: "pending",
    reportCount: 4,
    imageUrl: "https://picsum.photos/seed/post1/300/200"
  },
  {
    id: "post_2",
    title: "Offensive comment",
    content: "Honestly can't believe you'd say something that stupid. Grow up.",
    author: { username: "sara.meyer", id: "user_2" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-08",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://picsum.photos/seed/post2/300/200"
  },
  {
    id: "post_3",
    title: "Hate speech rant",
    content: "We don't need those people around here, they just ruin everything.",
    author: { username: "realTalkGuy", id: "user_3" },
    reportedReason: "Hate Speech",
    reportedAt: "2025-07-07",
    status: "pending",
    reportCount: 5,
    imageUrl: "https://picsum.photos/seed/post3/300/200"
  },
  {
    id: "post_4",
    title: "Buy followers instantly",
    content: "Boost your Instagram with 10,000 followers today. Limited time offer!",
    author: { username: "techno_mark", id: "user_4" },
    reportedReason: "Spam",
    reportedAt: "2025-07-06",
    status: "pending",
    reportCount: 2,
    imageUrl: "https://picsum.photos/seed/post4/300/200"
  },
  {
    id: "post_5",
    title: "Threat message",
    content: "Keep talking and I'll make sure you regret it. Your days online are numbered.",
    author: { username: "dark_shade", id: "user_5" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-06",
    status: "pending",
    reportCount: 6,
    imageUrl: "https://picsum.photos/seed/post5/300/200"
  },
  {
    id: "post_6",
    title: "Quick loans scam",
    content: "Need cash fast? No credit check, get $5000 today! Just DM me your details.",
    author: { username: "loan_expert88", id: "user_6" },
    reportedReason: "Spam",
    reportedAt: "2025-07-05",
    status: "pending",
    reportCount: 2,
    imageUrl: "https://picsum.photos/seed/post6/300/200"
  },
  {
    id: "post_7",
    title: "Personal insult",
    content: "You're honestly the dumbest person I've seen on this platform. Pathetic.",
    author: { username: "sunny_sarcasm", id: "user_7" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-05",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://picsum.photos/seed/post7/300/200"
  },
  {
    id: "post_8",
    title: "Shocking news article",
    content: "BREAKING: Drinking coffee linked to sudden hair loss. Click to read!",
    author: { username: "clickMaster", id: "user_8" },
    reportedReason: "Fake News",
    reportedAt: "2025-07-04",
    status: "pending",
    reportCount: 1,
    imageUrl: "https://picsum.photos/seed/post8/300/200"
  },
  {
    id: "post_9",
    title: "Offensive meme shared",
    content: "Posted a meme mocking religious communities — some found it funny, others furious.",
    author: { username: "meme_zone", id: "user_9" },
    reportedReason: "Hate Speech",
    reportedAt: "2025-07-03",
    status: "pending",
    reportCount: 5,
    imageUrl: "https://picsum.photos/seed/post9/300/200"
  },
  {
    id: "post_10",
    title: "Lottery scam",
    content: "Congrats! You've won $1,000,000. Just send us a small processing fee.",
    author: { username: "crypto_boost", id: "user_10" },
    reportedReason: "Spam",
    reportedAt: "2025-07-03",
    status: "pending",
    reportCount: 4,
    imageUrl: "https://picsum.photos/seed/post10/300/200"
  },
  {
    id: "post_11",
    title: "Cyberbullying post",
    content: "Everyone here knows you’re worthless, just stop posting already.",
    author: { username: "zero_filter", id: "user_11" },
    reportedReason: "Harassment",
    reportedAt: "2025-07-02",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://picsum.photos/seed/post11/300/200"
  },
  {
    id: "post_12",
    title: "MLM recruitment",
    content: "Join my team and earn six figures from your couch! DM for details.",
    author: { username: "mlm_queen", id: "user_12" },
    reportedReason: "Spam",
    reportedAt: "2025-07-01",
    status: "pending",
    reportCount: 2,
    imageUrl: "https://picsum.photos/seed/post12/300/200"
  },
  {
    id: "post_13",
    title: "Inciting violence",
    content: "We can’t wait any longer. It’s time to take up arms and demand change by force.",
    author: { username: "angry_mike", id: "user_13" },
    reportedReason: "Hate Speech",
    reportedAt: "2025-06-30",
    status: "pending",
    reportCount: 6,
    imageUrl: "https://picsum.photos/seed/post13/300/200"
  },
  {
    id: "post_14",
    title: "Fake charity request",
    content: "Help save the poor rainbow cats! Donate via crypto wallet now.",
    author: { username: "donate4cats", id: "user_14" },
    reportedReason: "Spam",
    reportedAt: "2025-06-29",
    status: "pending",
    reportCount: 3,
    imageUrl: "https://picsum.photos/seed/post14/300/200"
  },
  {
    id: "post_15",
    title: "Direct personal threat",
    content: "Trust me, I know where you live. Keep talking and see what happens.",
    author: { username: "maskedShadow", id: "user_15" },
    reportedReason: "Harassment",
    reportedAt: "2025-06-28",
    status: "pending",
    reportCount: 7,
    imageUrl: "https://picsum.photos/seed/post15/300/200"
  },
  {
    id: "post_16",
    title: "Rude joke",
    content: "Ever heard a joke so bad it offends everyone? Here it goes...",
    author: { username: "jokester99", id: "user_16" },
    reportedReason: "Harassment",
    reportedAt: "2025-06-27",
    status: "pending",
    reportCount: 2,
    imageUrl: "https://picsum.photos/seed/post16/300/200"
  },
  {
    id: "post_17",
    title: "Miracle cure post",
    content: "Doctors hate him! Discover this one secret herb that cures everything overnight.",
    author: { username: "natureMan", id: "user_17" },
    reportedReason: "Fake News",
    reportedAt: "2025-06-26",
    status: "pending",
    reportCount: 2,
    imageUrl: "https://picsum.photos/seed/post17/300/200"
  },
  {
    id: "post_18",
    title: "Get rich fast scheme",
    content: "Invest just $100 and double your money by tomorrow. No risk at all!",
    author: { username: "financeGuru", id: "user_18" },
    reportedReason: "Spam",
    reportedAt: "2025-06-25",
    status: "pending",
    reportCount: 4,
    imageUrl: "https://picsum.photos/seed/post18/300/200"
  },
  {
    id: "post_19",
    title: "Mean comment",
    content: "Pretty sure you’re the dumbest person on this entire app.",
    author: { username: "blunt_truth", id: "user_19" },
    reportedReason: "Harassment",
    reportedAt: "2025-06-24",
    status: "pending",
    reportCount: 1,
    imageUrl: "https://picsum.photos/seed/post19/300/200"
  },
  {
    id: "post_20",
    title: "Crypto doubling scam",
    content: "Send me 1 ETH and I'll send you back 2. 100% guaranteed. Don’t miss out!",
    author: { username: "eth_miner", id: "user_20" },
    reportedReason: "Spam",
    reportedAt: "2025-06-23",
    status: "pending",
    reportCount: 5,
    imageUrl: "https://picsum.photos/seed/post20/300/200"
  }
]

export default mockPosts
