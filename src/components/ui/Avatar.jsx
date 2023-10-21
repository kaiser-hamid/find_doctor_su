export default function ({ src, sex }) {
  const avatar =
    sex.toLowerCase() == "female"
      ? "/images/site/doctor-female.jpg"
      : "/images/site/doctor-male.jpg";
  const path = src || avatar;
  return <img src={path} alt="Profile picture" className="h-18 rounded-md" />;
}
