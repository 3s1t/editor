import { useNavigate } from "react-router-dom";

const libraries = [
  { name: "Remix", url: "https://remix.run/" },
  { name: "React", url: "https://reactjs.org/" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "Tailwind", url: "https://tailwindcss.com/" },
  { name: "DaisyUI", url: "https://daisyui.com/" },
  { name: "ReactDnd", url: "https://daisyui.com/" },
  { name: "Zustand", url: "https://github.com/pmndrs/zustand" },
  { name: "Immer", url: "https://immerjs.github.io/immer/" },
  { name: "Vercel", url: "https://vercel.com" },
];

export default function () {
  const navigate = useNavigate();

  return (
    <div className="hero h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Browser Based CAD Tool</h1>
          <p className="py-6">
            {libraries.map((library, i) => (
              <span key={i}>
                <a className="link" href={library.url}>
                  {library.name}
                </a>
                {i != libraries.length - 1 && " - "}
              </span>
            ))}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/model")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
