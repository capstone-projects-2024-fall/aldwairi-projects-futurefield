# Use the official TensorFlow image as the base image
FROM tensorflow/tensorflow:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the Python script to the container
COPY train.py requirements.txt ./


# Install any required Python packages (if applicable)
RUN pip install -r ./requirements.txt

# Run the Python script when the container starts
CMD ["python", "train.py"]