# face-detection-AI
I created a face Identifier Ai with [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html)
face-api.js => JavaScript API for face detection and face recognition in the browser implemented on top of the tensorflow.js core API [tensorflow/tfjs-core](https://github.com/tensorflow/tfjs-core) </br></br> 
![Screenshot 2022-06-01 031910](https://user-images.githubusercontent.com/57180726/171305346-ad056798-c3b0-4668-8648-c88959f50daa.png) 
</br></br> 
# face-detection-AI uses several models like
- SSD Mobilenet V1 => For face detection, this project implements a SSD (Single Shot Multibox Detector) based on MobileNetV1. The neural net will compute the locations of each face in an image and will return the bounding boxes together with it's probability for each face
- face_landmark_68_model => This package implements a very lightweight and fast, yet accurate 68 point face landmark detector.
- Face Recognition Model => For face recognition, a ResNet-34 like architecture is implemented to compute a face descriptor (a feature vector with 128 values) from any given face image, which is used to describe the characteristics of a persons face. 
