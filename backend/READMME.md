the docker file is used to create the models without having to install tensorflow
"docker build -t tensorflow-trainer ."


"docker run --rm -v /c/Users/"username"/Documents/Capstone/aldwairi-projects-futurefield/backend/models:/usr/src/app/models tensorflow-trainer"
That is the path that worked for me on Windows, replace username with your systems's username, before the colon is the systems path, after is the containers path.
There may be a way to do it with relative paths but it didn't work for me, but might work on macs or linux.
