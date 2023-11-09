APP_DIR="apps/crypto-price-render"

echo "Deploying app to K8S..."
kubectl apply -f "$APP_DIR/deployment"
