import './App.css'

import ProfileList from "./ProfileList";

function App() {

  const users = [
  {
    name: "Leanne Graham",
    role: "Software Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  {
    name: "Ervin Howell",
    role: "UI/UX Designer",
    avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg"
  },
  {
    name: "Clementine Bauch",
    role: "Project Manager",
    avatarUrl: "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    name: "Patricia Lebsack",
    role: "QA Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/women/31.jpg"
  },
  {
    name: "Chelsey Dietrich",
    role: "DevOps Specialist",
    avatarUrl: "https://randomuser.me/api/portraits/women/41.jpg"
  },
  {
    name: "Dennis Schulist",
    role: "Product Owner",
    avatarUrl: "https://randomuser.me/api/portraits/men/51.jpg"
  },
  {
    name: "Kurtis Weissnat",
    role: "Backend Developer",
    avatarUrl: "https://randomuser.me/api/portraits/men/66.jpg"
  }
];


  return (
    <div className="app">
      <h1>User Profiles</h1>
      <ProfileList users={users} />
    </div>
  );
}

export default App
