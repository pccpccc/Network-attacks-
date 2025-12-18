@echo off
echo ====================================
echo K8s Load Balancing Demo Deployment Script
echo ====================================

echo.
echo [1/4] Installing Nginx Ingress Controller...
.\helm.exe repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
.\helm.exe repo update
.\helm.exe upgrade --install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace --set controller.metrics.enabled=true --set controller.metrics.serviceMonitor.enabled=false --set controller.podAnnotations."prometheus\.io/scrape"="true" --set controller.podAnnotations."prometheus\.io/port"="10254"

echo.
echo [2/4] Installing Prometheus + Grafana (kube-prometheus-stack)...
.\helm.exe repo add prometheus-community https://prometheus-community.github.io/helm-charts
.\helm.exe upgrade --install my-monitor prometheus-community/kube-prometheus-stack --namespace default

echo.
echo [3/4] Deploying application...
kubectl apply -f k8s-demo.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress-protection.yaml
kubectl apply -f nginx-servicemonitor.yaml

echo.
echo [4/4] Waiting for pods to start...
timeout /t 10 /nobreak >nul
kubectl get pods

echo.
echo ====================================
echo Deployment complete!
echo Web: http://localhost
echo Grafana: kubectl port-forward svc/my-monitor-grafana 3001:80
echo          Then open http://localhost:3001 (admin / prom-operator)
echo ====================================
