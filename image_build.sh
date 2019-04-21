#!/bin/bash

IMAGE=${1:-UI}
REVISION=${2:-latest}

if [ "${IMAGE}" == "UI" ]; then
    _image_name="fako_ui"
    _cmd_opts="-f build_docker/Dockerfile_ui"
else
   _image_name="ngx_mocker"
   _cmd_opts="-f build_docker/Dockerfile_ngx_mocker"
fi

docker build $_cmd_opts -t "${_image_name}:${REVISION}" .
