const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

async function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  let image
  let canvas
  document.body.append('Loaded')
  //attarch event lister to the image upload element
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove() //remove the image if it exists so that it can be replaced with the new image
    if (canvas) canvas.remove() // remove the canvas if it exists so that it can be replaced with the new canvas
    image = await faceapi.bufferToImage(imageUpload.files[0])                 //convert the buffer to a image
    container.append(image)                                                    //append the image to the container
    canvas = faceapi.createCanvasFromMedia(image)                               //create a canvas from the image
    container.append(canvas)                                                     //append the canvas to the container
    const displaySize = { width: image.width, height: image.height }             //create a display size
    faceapi.matchDimensions(canvas, displaySize)                                      //match the canvas size to the image size
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()    //detect all faces in the image
    const resizedDetections = faceapi.resizeResults(detections, displaySize)                            //resize the detections to the display size
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))                 //match the face descriptor to the labeled face descriptor with 60% match and put a label on the face
    results.forEach((result, i) => {                            //loop through the results
      const box = resizedDetections[i].detection.box            //get the box of the face
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })       //create a draw box
      drawBox.draw(canvas)                                                              //draw the box on the canvas
    })
  })
}

function loadLabeledImages() {
  const labels = ['daniel ngao', 'kevin comba', 'denis wachira']    //create an array of labels which match the folders of my test images 
  return Promise.all(
    labels.map(async label => { //loop through the labels and return a promise for each label
      const descriptions = []
      for (let i = 1; i <= 11; i++) { //loop through the images in each folder.Using  i =1 to 2 since i have used 2 images in each folder
        const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/kelcho-spense/face-detection-AI/main/labeled_images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }     
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}
