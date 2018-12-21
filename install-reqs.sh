#!/bin/bash

# Simple script to install the PERLS architecture requirements
function announce() {
	echo ""
	echo "#====================================================#"
	echo "#"
	echo "#            Installing $1"
	echo "#"
	echo "#====================================================#"
}

# Curl
#
announce "Curl"

if ! [ -x "$(command -v curl)" ]; then
	
	# Curl is easy
	apt-get install curl
	
else
	echo "Skipping, Curl already installed!"
fi

# Java
#
announce "Java"

if ! [ -x "$(command -v java)" ]; then
	
	# Add the oracle source and update / install
	add-apt-repository ppa:webupd8team/java
	apt-get update
	apt-get install oracle-java8-installer
	
else
	echo "Skipping, Java already installed!"
fi

# Maven
#
announce "Maven"

if ! [ -x "$(command -v mvn)" ]; then
	
	# Maven is pretty simple
	apt-get install maven
	
else
	echo "Skipping, Maven already installed!"
fi

# Docker
#
announce "Docker"

if ! [ -x "$(command -v docker)" ]; then
	
	# Docker is a bit complicated
	#
	# Add the GPG Key
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
	
	# Add the Docker repository to our APT sources
	add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
	
	# With those added, update our packages
	apt-get update

	# Since we're up to date, get docker
	apt-get install -y docker-ce
else
	echo "Skipping, docker already installed!"
fi


# Docker-Compose
#
announce "Docker-Compose"

if ! [ -x "$(command -v docker-compose)" ]; then
	
	# Docker-Compose is also complicated
	#
	# Add the GPG Key
	curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
	
	# Make sure it's executable
	chmod +x /usr/local/bin/docker-compose

else
	echo "Skipping, docker-compose already installed!"
fi

echo "Launch server requirements should all be ready."
echo ""
