
function logo({width = '100px'}) {
  return (
    <div>
      <img className="logo" width={width} height={width} style={{margin: '0 auto'}} 
      src="../../src/assets/Fevicon.png" alt="logo" />
    </div>
  )
}

export default logo