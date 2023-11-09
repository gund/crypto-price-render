APP_DIR="apps/crypto-price-render"

echo "Building app image..."
docker buildx build --platform linux/arm64/v8 -t gundua/crypto-price-render:latest --push -f "$APP_DIR/container/Dockerfile" .
docker tag crypto-price-render:latest gundua/crypto-price-render:latest
docker push gundua/crypto-price-render:latest
