/*----------------------------------------*\
  23_24_AN1_clipWeb - NFCTool.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2024-03-15 16:06:42
  @Last Modified time: 2024-03-15 16:46:57
\*----------------------------------------*/
const NFCTool = (debug)=>{
	let logElem ;
	if(debug){
		logElem = document.createElement("ul");
		document.body.append(logElem);

		logElem.style.zIndex = 10;
		logElem.style.position = "absolute";

		logElem.style.top = 0;
		logElem.style.left = 0 ;
	}

	const log = (...e)=>{
		if(logElem){
			const logItem = document.createElement("li");
			logItem.innerText = e.join(", ");	
			logElem.append(logItem);
		}
	}

	const tagHandlers = [];
	const ndef = new NDEFReader();
	ndef.scan()
		.then(()=>{
			ndef.addEventListener("readingerror", () => {
				log("Argh! Cannot read data from the NFC tag. Try another one?");
				return false;
			});
			ndef.addEventListener("reading", (event) => {
				event.preventDefault();
				const { message, serialNumber } = event;
				
				const {length} = tagHandlers
					.filter(({tag}) => tag == serialNumber)
					.map(({tagHandler}) => tagHandler());

				log(`> Serial Number: ${serialNumber}`);
				return false;
			});
		});

	return {
		on(tag, tagHandler){
			tagHandlers.push({
				tag, tagHandler
			});
		}
	}
}