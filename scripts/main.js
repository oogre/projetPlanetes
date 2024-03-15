/*----------------------------------------*\
  23_24_AN1_clipWeb - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2024-02-23 00:24:49
  @Last Modified time: 2024-03-15 17:10:31
\*----------------------------------------*/

let videos = [{
	tag : "04:85:b7:2c:b6:2a:81",
	video : 'assets/video/VIDEONAME1.mp4'
},{
	tag : "04:86:b7:2c:b6:2a:81",
	video : 'assets/video/VIDEONAME2.mp4'
}];

function setup(){
	noCanvas();
	document.querySelector("button#play")
		.addEventListener("click", ()=>{
			const btn = document.querySelector("button#play")
			btn.parentElement.removeChild(btn);
			
			const nfc = NFCTool(true);
			const vids = videos.map(({tag, video})=>{
				const v = createVideo(video);
				v.elt.style.display = "none";
				v.elt.addEventListener("play", (event) => {
					v.elt.style.display = "block";
				});
				v.elt.addEventListener("pause", (event) => {
					v.elt.style.display = "none";
				});
				v.elt.addEventListener("stop", (event) => {
					v.elt.style.display = "none";
				});
				nfc.on(tag, ()=>{
					vids.map(vid=>vid.stop())
					v.play()
				});
				return v;
			});
	});
}

function draw(){
	background(255);
}