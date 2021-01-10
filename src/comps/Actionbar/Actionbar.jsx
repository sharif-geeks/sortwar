import useCallers from "../../hooks/useCallers";

function Actionbar() {
  const {
    handleCallDataGen,
    handleCallProgram,
    handleCallReferee,
  } = useCallers();

  return (
    <div>
      <button onClick={handleCallDataGen}>Make Random Data</button>
      <button onClick={handleCallProgram}>Sort Gen Data</button>
      <button onClick={handleCallReferee}>Check if correctly sorted</button>
    </div>
  );
}

export default Actionbar;
