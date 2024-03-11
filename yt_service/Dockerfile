FROM --platform=$BUILDPLATFORM python:3.8-alpine AS builder

WORKDIR /yt_service

COPY ./requirements.txt ./
RUN pip install --upgrade pip
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

COPY . /yt_service
# COPY ./config/youtube_service.ini ./config/

ENTRYPOINT ["python3","youtube_service.py","--env","dev","--count","1"]
# ENTRYPOINT [ "/bin/bash" ]

FROM builder as dev-envs

RUN <<EOF
apk update
apk add git
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /