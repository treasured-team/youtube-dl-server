if [ $LAYERCI_BRANCH = 'develop' ]
then
    docker login -u unset -p $OKD_DEV_REGISTRY_TOKEN $OKD_DEV_REGISTRY_URL
    docker tag image $OKD_DEV_REGISTRY_URL/treasureworld/youtube-dl-server:latest
    docker push $OKD_DEV_REGISTRY_URL/treasureworld/youtube-dl-server
elif [ $LAYERCI_BRANCH = 'master' ]
then
    docker login -u unset -p $OKD_PRODUCTION_REGISTRY_TOKEN $OKD_PRODUCTION_REGISTRY_URL
    docker tag image $OKD_PRODUCTION_REGISTRY_URL/treasureworld/youtube-dl-server:latest
    docker push $OKD_PRODUCTION_REGISTRY_URL/treasureworld/youtube-dl-server
fi
