export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'Ready to Move In' | 'Off-Plan - High ROI';
  type: 'Buy' | 'Rent';
  category: 'Apartment' | 'Villa' | 'Penthouse' | 'Commercial';
  imageUrl: string;
  description: string;
}

export const properties: Property[] = [
  {
    id: 'westlands-pinnacle',
    title: 'The Westlands Pinnacle',
    location: 'Westlands, Nairobi',
    price: 45000000,
    status: 'Ready to Move In',
    type: 'Buy',
    category: 'Apartment',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ41GSpXozJjxBbM4p1IuNmxDMk5Dq3z2I9Sc0HOKpfdjUq0ug46t1aoxWAfrt3CGocGIgU2PqPBU3RivuoYZL6gXcJNWJCLYMbFCv6Or-Wqx5q9XWzslhcmXYAknHl1_RHlr3hEp6_0QixviszVYrNQWD7VEau_uWGZBgLLT11tUuugK9UiI8haX6CQ1BHVj8hkIYh_9gRE2PhqlkrwGTFMDrZW0Cnye2fo-qM7DZk5hpO0OtNeykb5CP8dFNy5DN6YhHDrrlholJ',
    description: 'A sleek, hyper-modern high-rise apartment exterior in Westlands, Nairobi, shot at dusk.'
  },
  {
    id: 'karen-enclave',
    title: 'Karen Enclave Estates',
    location: 'Karen, Nairobi',
    price: 85000000,
    status: 'Off-Plan - High ROI',
    type: 'Buy',
    category: 'Villa',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbfa3jAJRvAElATsxQVKUlMqxUD9hZXtR6lIZTvQmbJJxr42gwm_Cv2NY7H7rhpdrNm5pivv8y_LBlOXMpS0XQKt4r4BFfzYLnutVZ5QuFmokmLW1Z0uCamEr39XFrO04KF2SYzFyRF7-FjgqGVmy4tKzg7y1KM3xeIzqwPN8dCT1Zdc3bV-ttSlO_jgtN2uCYcl-DhBZmlUAhHQyvyDI5uIXlDLXQhDWabRaujyQzxtIxPHBkbbKZeTi3iGvZOMurZnyzaV6UZKQ0',
    description: 'A striking rendering of an off-plan luxury villa in Karen, Nairobi.'
  },
  {
    id: 'kilimani-sky-villas',
    title: 'The Kilimani Sky Villas',
    location: 'Kilimani, Nairobi',
    price: 35000000,
    status: 'Ready to Move In',
    type: 'Buy',
    category: 'Penthouse',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB7zDWHRNYiu79AekVv5XFdGgyDmWoquNXLmYPshu6gNqqNfi0iuFuGCwQGnxJlgWk4GT7nFho-EjZ-5-i0IVGpLNca06vlR7-HRWw9EqjsR3FNelwjCOwy8GQkPMqE0AkaZyjYE79BjhCj6-YmU9VY30BWwskNfEr6L1W0pE5dBjZ2xtAtRVv_PchkT_h1OhWvqQ1wQwCmCiHRcMLzhGJlSy3nobB2Na1XNo7mTQStHGQAYK4mWKrk-pw5lsouwHb0SoFOOE3kLvh',
    description: 'An interior shot of a minimalist, high-end living room in a Kilimani penthouse.'
  },
  {
    id: 'muthaiga-grand',
    title: 'Muthaiga Grand Residences',
    location: 'Muthaiga, Nairobi',
    price: 120000000,
    status: 'Off-Plan - High ROI',
    type: 'Buy',
    category: 'Commercial',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JbWVrAsOTDfCNbcxvB2aBEvcwjzYxDSgtKbUi6mk9ho5vNOjIDmh6BSgMasHEL1_VZeARAO334QyWb5-YCed2XaBlSx4_upUD3HGy42kERQIOHbZE-X2rcLoSvk9B-_Huuy3U8nlIvLiZ8DLUjFASxDNYKyLamcclNbdCUf0o1cKHEAFYSITDfhG-VRaL1RbAVXsRbsvAF26cKfHbsrYie441_4CRzXeM779rw_S5p8BhxQDeLkg0hSYwzvSBLgkb2rVlYb33XTH',
    description: 'A dramatic architectural visualization of a commercial-residential hybrid tower in Muthaiga.'
  }
];
