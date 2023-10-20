# Intended to be imported into a bash shell using a one-liner such as `. <(curl https://vkm.ca/bb)`

g() {
grep -R "$1" *
}

echo 'VKM bash bootstrap imported.'
