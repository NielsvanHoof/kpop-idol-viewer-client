export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <svg
        className="animate-spin h-10 w-10 text-purple-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25 stroke-current"
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
        />
        <path
          className="opacity-75 fill-current"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>
  );
}
