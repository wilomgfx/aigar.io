#!/bin/bash

while [[ $# -gt 1 ]]
do
    key="$1"

    case $key in
        -p)
            PREFIX_PATH="$2"
            shift # past argument=value
            ;;
        *)
            # unknown option
            ;;
    esac
    shift
done

./build.sh

nginx -c "$PREFIX_PATH/conf" -p "$PREFIX_PATH"

./sbt.sh
