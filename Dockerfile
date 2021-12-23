FROM public.ecr.aws/lambda/nodejs:14 as build

COPY install-browser.sh package.json package-lock.json src/

WORKDIR ./src

RUN yum install xz atk cups-libs gtk3 libXcomposite alsa-lib tar \
    libXcursor libXdamage libXext libXi libXrandr libXScrnSaver \
    libXtst pango at-spi2-atk libXt xorg-x11-server-Xvfb \
    xorg-x11-xauth dbus-glib dbus-glib-devel unzip bzip2 wget -y -q

RUN /usr/bin/bash ./install-browser.sh

RUN npm ci --verbose

COPY . .

RUN npm run build

FROM build AS test

# build arg used to invalidate cache so tests will run
ARG TIMESTAMP

RUN npm run test

FROM test AS run

RUN cp -rp ./build/src/* /var/task/
RUN cp -rp ./node_modules/* /var/task/
