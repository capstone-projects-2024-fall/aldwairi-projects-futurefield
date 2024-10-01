# Use the official TensorFlow image as the base image
FROM tensorflow/tensorflow:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the Python script to the container
COPY train.py .

# Install any required Python packages (if applicable)

# Ensure that the container writes to a shared volume (bind mount for model output)
#VOLUME ["/usr/src/app/models"]

# Run the Python script when the container starts
CMD ["python", "train.py"]