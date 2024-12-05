import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const games = [
      { id: 1, name: "Naruto ultimate ninja storm", price: 29.99, imageUrl: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/349040/header_thai.jpg?t=1703080866/150" },
      { id: 2, name: "The last of us part ii", price: 49.99, imageUrl: "https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1662077989441-6V5D9YCJD018NAXP62M0/d20220518_TLOUX_SocialAssets_T1X_-Annouce_16x9.jpg?format=1000w/150" },
      { id: 3, name: "Marvel spider man remastered", price: 59.99, imageUrl: "https://rukminim2.flixcart.com/image/850/1000/xif0q/code-in-the-box-game/q/e/d/pc-marvel-s-spider-man-remastered-edition-original-imaggg2zs7dhqsff.jpeg?q=90&crop=false/150" },
      { id: 4, name: "Marvel spider man 2", price: 39.99, imageUrl: "https://cdn1.epicgames.com/offer/b2818b59c0bb420e9647983dfd254931/EGS_MarvelsSpiderManDigitalDeluxeEditionUpgrade_InsomniacGamesNixxesSoftware_AddOn_S1_2560x1440-78f4b1854ef54a8f14075fbdb61e0cce?resize=1&w=480&h=270&quality=medium/150" },
      { id: 5, name: "Tekken 8", price: 19.99, imageUrl: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1778820/capsule_616x353.jpg?t=1729824657/150" },
      { id: 6, name: "Mario Party 8", price: 89.99, imageUrl: "https://i.ytimg.com/vi/5EFIbLYpYy8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBYSnhECd03up7VH-NIpOxTDBAYzQ/150" },
      { id: 7, name: "Minecraft", price: 79.99, imageUrl: "https://www.venturegames.com.pk/cdn/shop/files/Minecraft.jpg?v=1706792970/150" },
      { id: 8, name: "Stardew valley", price: 49.99, imageUrl: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1711128146/150" },
      { id: 9, name: "Lethal company", price: 39.99, imageUrl: "https://i.ytimg.com/vi/BFJIwEPgpZw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLALpNAL7Qiyk_PDXBYgvjwLB1-qLw/150" },
      { id: 10, name: "Terraria", price: 59.99, imageUrl: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/105600/capsule_616x353.jpg?t=1731252354/150" },
    ];
    res.status(200).json(games);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
