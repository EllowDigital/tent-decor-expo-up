/**
 * MEMBERS DATA — State Core Committee + City-Wise Chapters.
 * Photos live in /public/assets/ — reference as "/assets/filename.jpg".
 * Leave `img` undefined and the UI falls back to a monogram avatar.
 */

export type Member = {
  name: string;
  role: string;
  district?: string;
  img?: string;
};

export type CityChapter = {
  city: string;
  members: Member[];
};

/** Top-tier office-bearers — shown as the leadership grid on /members */
export const coreCommittee: Member[] = [
  { name: "Vijay Kumar", role: "President", img: "/assets/p1.jpg" },
  { name: "Rajeev Kumar Singh", role: "General Secretary", img: "/assets/p2.jpg" },
  { name: "Sandeep Tiwari", role: "Treasurer", img: "/assets/p4.jpg" },
  { name: "Meera Agrawal", role: "Women's Wing Convener", img: "/assets/p3.jpg" },
];

/** Executive committee & district conveners — supporting leadership row */
export const executiveCommittee: Member[] = [
  { name: "Anil Srivastava", role: "Vice President", district: "Lucknow" },
  { name: "Mohd. Aslam", role: "Joint Secretary", district: "Varanasi" },
  { name: "Ramesh Chandra Gupta", role: "Executive Member", district: "Agra" },
  { name: "Deepak Sahu", role: "Executive Member", district: "Prayagraj" },
  { name: "Suresh Yadav", role: "District Convener", district: "Kanpur" },
  { name: "Neeraj Pandey", role: "District Convener", district: "Gorakhpur" },
  { name: "Praveen Chaurasia", role: "District Convener", district: "Meerut" },
  { name: "Kailash Nath", role: "District Convener", district: "Bareilly" },
];

/** City-wise chapters — powers the interactive tabs/accordions on /members */
export const cityChapters: CityChapter[] = [
  {
    city: "Lucknow",
    members: [
      { name: "Anil Srivastava", role: "City President" },
      { name: "Rakesh Verma", role: "City Secretary" },
      { name: "Sunil Kashyap", role: "Treasurer" },
      { name: "Manoj Rastogi", role: "Executive Member" },
    ],
  },
  {
    city: "Kanpur",
    members: [
      { name: "Suresh Yadav", role: "City President" },
      { name: "Prem Chandra Awasthi", role: "City Secretary" },
      { name: "Rajeev Nigam", role: "Treasurer" },
      { name: "Harish Tandon", role: "Executive Member" },
    ],
  },
  {
    city: "Varanasi",
    members: [
      { name: "Mohd. Aslam", role: "City President" },
      { name: "Vinod Gupta", role: "City Secretary" },
      { name: "Ashok Pandey", role: "Treasurer" },
    ],
  },
  {
    city: "Agra",
    members: [
      { name: "Ramesh Chandra Gupta", role: "City President" },
      { name: "Vikas Sharma", role: "City Secretary" },
      { name: "Deepak Agarwal", role: "Treasurer" },
    ],
  },
  {
    city: "Prayagraj",
    members: [
      { name: "Deepak Sahu", role: "City President" },
      { name: "Ajay Mishra", role: "City Secretary" },
      { name: "Sanjay Tripathi", role: "Executive Member" },
    ],
  },
  {
    city: "Gorakhpur",
    members: [
      { name: "Neeraj Pandey", role: "City President" },
      { name: "Rakesh Singh", role: "City Secretary" },
    ],
  },
  {
    city: "Meerut",
    members: [
      { name: "Praveen Chaurasia", role: "City President" },
      { name: "Vipin Jain", role: "City Secretary" },
    ],
  },
  {
    city: "Bareilly",
    members: [
      { name: "Kailash Nath", role: "City President" },
      { name: "Rajendra Prasad", role: "City Secretary" },
    ],
  },
];
