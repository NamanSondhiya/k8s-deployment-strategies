# 2048 Game with Kubernetes CI/CD

This project is a containerized version of the classic 2048 puzzle game, set up for deployment with Kubernetes and CI/CD pipelines. It includes plans to expand into a full DevSecOps setup on AWS.

## Features

### Game
- Classic 2048 gameplay with tile merging
- Responsive design for desktop and mobile
- Touch support with swipe gestures
- Score tracking saved locally
- Keyboard controls for desktop
- Clean UI with smooth animations

### DevOps
- Containerized with Docker
- Kubernetes manifests for deployment
- CI/CD pipelines using GitHub Actions
- Automated testing and deployment
- Monitoring and logging (planned)
- Security scanning and compliance (planned)

### Planned Enhancements
- Deployment to AWS EKS
- Infrastructure as Code with Terraform
- Security automation via AWS Security Hub
- Automated vulnerability scanning
- Compliance monitoring and reporting
- Multi-environment setups (dev/staging/prod)

## Quick Start

### Local Development
```bash
# Clone the repo
git clone <your-repo-url>
cd 2048-with-CI-CD

# Open in browser
open index.html
```

### Kubernetes Deployment
```bash
# Deploy to local cluster
kubectl apply -f k8s/
kubectl port-forward svc/2048-game 8080:80
# Visit http://localhost:8080
```

### AWS Deployment (Planned)
```bash
# Deploy to AWS EKS with Terraform
cd terraform/
terraform init
terraform apply
```

## Project Structure
```
2048-with-CI-CD/
├── .github/workflows/
│   ├── game.yml
│   └── dockerpush.yml
├── k8s/
│   └── deployment.yml
├── game.js
├── index.html
├── style.css
├── Dockerfile
└── README.md
```

## Game Controls
- Arrow keys: Move tiles (desktop)
- Swipe gestures: Move tiles (mobile)
- New Game button: Reset the game

## Technical Stack
- Frontend: Vanilla JavaScript, HTML5, CSS3
- Containerization: Docker
- Orchestration: Kubernetes
- CI/CD: GitHub Actions
- Infrastructure: AWS EKS, Terraform (planned)
- Security: AWS Security Hub, vulnerability scanners (planned)
- Monitoring: Prometheus, Grafana (planned)

## Roadmap

### Phase 1: Containerization & Basic CI/CD (Current)
- [x] Containerize the app
- [x] Basic Kubernetes deployment
- [x] GitHub Actions CI/CD pipeline

### Phase 2: DevSecOps Foundation (Q1 2025)
- [ ] Add security scanning to CI/CD
- [ ] Set up monitoring and logging
- [ ] Enable multi-environment deployments
- [ ] Expand automated testing

### Phase 3: AWS Migration & Advanced DevSecOps (Q4 2024)
- [ ] Move to AWS EKS
- [ ] Implement Infrastructure as Code with Terraform
- [ ] Build advanced security automation
- [ ] Add compliance monitoring
- [ ] Optimize performance

## Skills Demonstrated

This project shows skills in full-stack development with JavaScript, HTML, and CSS for the game. It covers containerization using Docker, Kubernetes for orchestration, CI/CD with GitHub Actions, and planning for DevOps practices like infrastructure automation, cloud platforms on AWS, security through DevSecOps, and Infrastructure as Code with Terraform.

## Browser Support
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome
- Android Chrome, Firefox

## Contributing
Feel free to contribute. Follow standard Git practices and make sure tests pass.

## License
MIT License - use and modify as needed.
