import Spiner from "../../images/Spinner.gif";

const Loading = () => {
  return (
    <div className="text-center w-[100%]  items-center flex justify-center">
      <img src={Spiner} alt="spiner" style={{ height: "70px" }} />
    </div>
  );
};

export default Loading;
