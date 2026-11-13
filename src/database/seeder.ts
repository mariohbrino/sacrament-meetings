import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { Pool } from "pg";

import { loadDatabaseConfig } from "@/configs/database.config";
import * as schemas from "@/database/schema";
import { SacramentMeeting } from "@/types/meeting.type";

const meetings: Omit<SacramentMeeting, "id">[] = [
  {
    date: "2026-10-04",
    meetingType: "general",
    presiding: "Bishop Smith",
    conducting: "Brother Smith",
    announcements: ["Ward temple night: May 3"],
    openingHymn: {
      number: 1,
      title: "Come, Come, Ye Saints",
    },
    openingPrayer: "Brother Johnson",
    wardBusiness: [
      {
        description: "Sustaining of new Bishopric member",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 166,
      title: "The Spirit of God",
    },
    speakers: [
      {
        name: "Sister Johnson",
        topic: "Faith and Testimony",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 30,
      title: "Come, Ye Thankful People, Come",
    },
    closingPrayer: "Sister Davis",
  },
  {
    date: "2026-10-11",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Smith",
    announcements: ["Ward temple night: May 3"],
    openingHymn: {
      number: 1,
      title: "Come, Come, Ye Saints",
    },
    openingPrayer: "Brother Johnson",
    wardBusiness: [
      {
        description: "Sustaining of new Bishopric member",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 166,
      title: "The Spirit of God",
    },
    speakers: [
      {
        name: "Sister Johnson",
        topic: "Faith and Testimony",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 30,
      title: "Come, Ye Thankful People, Come",
    },
    closingPrayer: "Sister Davis",
  },
  {
    date: "2026-10-18",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Smith",
    announcements: ["Ward temple night: May 3"],
    openingHymn: {
      number: 1,
      title: "Come, Come, Ye Saints",
    },
    openingPrayer: "Brother Johnson",
    wardBusiness: [
      {
        description: "Sustaining of new Bishopric member",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 166,
      title: "The Spirit of God",
    },
    speakers: [
      {
        name: "Sister Johnson",
        topic: "Faith and Testimony",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 30,
      title: "Come, Ye Thankful People, Come",
    },
    closingPrayer: "Sister Davis",
  },
  {
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Smith",
    announcements: ["Ward temple night: May 3"],
    openingHymn: {
      number: 1,
      title: "Come, Come, Ye Saints",
    },
    openingPrayer: "Brother Johnson",
    wardBusiness: [
      {
        description: "Sustaining of new Bishopric member",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 166,
      title: "The Spirit of God",
    },
    speakers: [
      {
        name: "Sister Johnson",
        topic: "Faith and Testimony",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 30,
      title: "Come, Ye Thankful People, Come",
    },
    closingPrayer: "Sister Davis",
  },
  {
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Smith",
    announcements: ["Ward temple night: May 3"],
    openingHymn: {
      number: 1,
      title: "Come, Come, Ye Saints",
    },
    openingPrayer: "Brother Johnson",
    wardBusiness: [
      {
        description: "Sustaining of new Bishopric member",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 166,
      title: "The Spirit of God",
    },
    speakers: [
      {
        name: "Sister Johnson",
        topic: "Faith and Testimony",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 30,
      title: "Come, Ye Thankful People, Come",
    },
    closingPrayer: "Sister Davis",
  },
  {
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: May 10"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },
  {
    date: "2026-11-15",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Johnson",
    announcements: ["Ward temple night: May 17"],
    openingHymn: {
      number: 3,
      title: "Now Let Us Rejoice",
    },
    openingPrayer: "Brother Thompson",
    wardBusiness: [
      {
        description: "Sustaining of new Relief Society president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: "Lord, I Would Follow Thee",
    },
    speakers: [
      {
        name: "Brother White",
        topic: "Charity and Service",
        type: "speaker",
      },
      {
        name: "Primary Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 34,
      title: "Come, Thou Fount of Every Blessing",
    },
    closingPrayer: "Sister Green",
  },
  {
    date: "2026-11-22",
    meetingType: "stake",
    presiding: "Bishop Smith",
    conducting: "Brother Williams",
    announcements: ["Ward temple night: May 24"],
    openingHymn: {
      number: 4,
      title: "Come, Let Us Sing of a Wonderful Love",
    },
    openingPrayer: "Brother Brown",
    wardBusiness: [
      {
        description: "Sustaining of new Young Men president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 177,
      title: "Jesus, Once of Humble Birth",
    },
    speakers: [
      {
        name: "Sister Taylor",
        topic: "The Power of Prayer",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 36,
      title: "How Great Thou Art",
    },
    closingPrayer: "Brother White",
  },
  {
    date: "2026-11-29",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Davis",
    announcements: ["Ward temple night: May 31"],
    openingHymn: {
      number: 5,
      title: "High on the Mountain Top",
    },
    openingPrayer: "Sister Taylor",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 184,
      title: "God Be with You Till We Meet Again",
    },
    speakers: [
      {
        name: "Brother Green",
        topic: "The Importance of Scripture Study",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 38,
      title: "Now Let Us Rejoice",
    },
    closingPrayer: "Brother Johnson",
  },
  {
    date: "2026-12-06",
    meetingType: "testimony",
    presiding: "Bishop Smith",
    conducting: "Brother Thompson",
    announcements: ["Ward temple night: June 7"],
    openingHymn: {
      number: 6,
      title: "I Am a Child of God",
    },
    openingPrayer: "Sister Brown",
    wardBusiness: [
      {
        description: "Sustaining of new Relief Society president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 190,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "Brother Johnson",
        topic: "Faith and Obedience",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 40,
      title: "God of Our Fathers",
    },
    closingPrayer: "Brother Davis",
  },
];

const main = async () => {
  const config = loadDatabaseConfig();

  const pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: config.sslMode ? { rejectUnauthorized: false } : undefined,
  });

  const db = drizzle({ client: pool });

  // Reset the database
  await reset(db, schemas);

  // Seed the database
  await db.insert(schemas.meetings).values(meetings);
};

main()
  .then(() => {
    console.log("Database seeding completed successfully.");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
