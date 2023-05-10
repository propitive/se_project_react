import avatarPath from "../images/avatar.svg";

export function SideBar() {
  return (
    <section className="sidebar">
      <img src={avatarPath} alt="logo" className="sidebar__avatar" />
      <div className="sidebar__name">Name</div>
    </section>
  );
}

export default SideBar;
