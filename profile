add(){
    git add $1
}
cm(){
    git commit -m "$1"
}
p(){
    git push origin $(git rev-parse --abbrev-ref HEAD)
}
co(){
    git checkout $1
}
