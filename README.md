Keycloak Federation Examples
--------------
This project is a Dockerized Keycloak instance pre-configured with various Identity Providers (IdPs).

If you've been tasked with standing up a Keycloak instance -- or maybe just confused about how to protect a web service using Keycloak -- this might be a good starting place for you.  Several protocols are already defined with the following:

| Protocol | Implementation | Source |
|---|---|---|
| **SAML 2.0**  | SimpleSAML | [Kristoph Junge](https://hub.docker.com/r/kristophjunge/test-saml-idp/)|
|  **LDAP** | OpenLDAP | [Osixia's Dockerfile](https://github.com/osixia/docker-openldap) |
| **OAuth**  | GitHub |  |

This configuration is intended to run on an Ubuntu 16.04+ OS, but later versions should work at well.  Docker for Windows and Mac have not been tested.

**Note: This project was created for educational purposes.  Always use caution when pulling code from the interne, especially anything to be used in your security stack.**

## What's in the box?
This project will create Docker containers for the following services:
- Keycloak (version 4.5.0.Final)
- OpenLDAP
- A web-accessible PHP admin for the OpenLDAP instance 
- SimpleSAML
- Postgres
- A simple NodeJS service protected by Keycloak

## How to Use
As this project is centered around Docker, there's very little setup required on the host machine. 

### TL;DR
1. `git clone https://github.com/vbhayden/keycloak-federation-examples`
1. `cd keycloak-federation-examples`
1. `sudo ./install-reqs.sh`
1. `sudo ./rebuild.sh`

Browse to `localhost:3000` to check that everything worked.  Log in with `user:password` and you should see a screen with your Keycloak user information.

### A bit more detail
Once you clone the repository, move to its root folder.  Here, you'll install all the necessary prerequisites and then run the actual build itself.  

Once the containers have finished building, the Keycloak service will need some time to start.  If Keycloak doesn't seem to come up and `localhost:8081` isn't accessible, then you can check its container logs with
```
sudo docker logs -f docker_keycloak
```

### Changing the Keycloak URL
The above steps and the original training materials assume that everything will run on an Ubuntu 16.04+ virtual machine, with `localhost` being used for all addresses.  You can change this address in the `.env` file.  By default, this file's contents are:
```
# Note that "localhost" will only in the expected way (navigating to something being served from
# the host machine) if the container is using the "host" network type.
#
KEYCLOAK_URL=localhost
```
Note that changing this may cause a mismatch between the federated redirect URIs and your Keycloak instance.  To rectify this, 
