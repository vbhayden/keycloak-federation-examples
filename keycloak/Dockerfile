FROM jboss/keycloak:4.5.0.Final

ENV POSTGRES_JDBC_VERSION=42.2.4

ARG WILDFLY_USERNAME
ARG WILDFLY_PASSWORD
ARG KEYCLOAK_USERNAME
ARG KEYCLOAK_PASSWORD

# Add the PostgreSQL module to the server
#
RUN cd /tmp && \
    curl -O http://central.maven.org/maven2/org/postgresql/postgresql/$POSTGRES_JDBC_VERSION/postgresql-$POSTGRES_JDBC_VERSION.jar && \
    mkdir -p /opt/jboss/keycloak/modules/system/layers/base/org/postgresql/main && \
    mv postgresql-$POSTGRES_JDBC_VERSION.jar /opt/jboss/keycloak/modules/system/layers/base/org/postgresql/main/postgresql.jar

# Make our adjustments
#
COPY wildfly-setup/cli /opt/jboss/keycloak/customization
RUN /opt/jboss/keycloak/customization/execute.sh

# Make sure our ports are available
#
EXPOSE 8080
EXPOSE 9990

# Copy our local files over
#
COPY docker-entry.sh /opt/jboss/docker-entry.sh
COPY wildfly-setup/modules/system/add-ons /opt/jboss/keycloak/modules/system/add-ons
COPY keycloak-config/realms/example-realm.json /tmp/example-realm.json

# WEIRD WORKAROUND TO PREVENT CRASH.  There's some permissions exception being thrown with this folder.
#
RUN rm -rf /opt/jboss/keycloak/standalone/configuration/standalone_xml_history/current/*

# Run the standalone server
#
RUN /opt/jboss/keycloak/bin/add-user.sh $WILDFLY_USERNAME $WILDFLY_PASSWORD
RUN /opt/jboss/keycloak/bin/add-user-keycloak.sh -r master -u $KEYCLOAK_USERNAME -p $KEYCLOAK_PASSWORD
CMD ["/opt/jboss/keycloak/bin/standalone.sh", "-b=0.0.0.0", "-bmanagement=0.0.0.0", "-Dkeycloak.import=/tmp/example-realm.json"]

ENTRYPOINT ["/opt/jboss/docker-entry.sh"]
