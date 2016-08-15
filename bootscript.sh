#!/usr/bin/env bash

# https://www.brightbox.com/docs/ruby/ubuntu/
# Get ruby 2.2
#sudo apt-get install software-properties-common
#sudo apt-add-repository ppa:brightbox/ruby-ng
#sudo apt-get update
#sudo apt-get ruby2.2 ruby2.2-dev

# Install everything to get a GitHub pages development environment running.
#sudo apt-get update -y
#sudo apt-get -y install git make joe nodejs npm zlib1g-dev

start_seconds="$(date +%s)"
echo "Welcome to the GitHub Pages initialization script."

apt_packages=(
    vim
    joe
    curl
    git-core
    nodejs
    libgmp3-dev
)

ping_result="$(ping -c 2 8.8.4.4 2>&1)"
if [[ $ping_result != *bytes?from* ]]; then
    echo "Network connection unavailable. Try again later."
    exit 1
fi

# Needed for nodejs.
# https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sSL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo add-apt-repository -y ppa:git-core/ppa

sudo apt-get update
sudo apt-get upgrade

echo "Installing apt-get packages..."
sudo apt-get install -y ${apt_packages[@]}
sudo apt-get clean

# RVM - Ruby Version Manager
# http://rvm.io/rvm/install
gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
curl -sSL https://get.rvm.io | bash -s stable --quiet-curl
source ~/.rvm/scripts/rvm
rvm install 2.1.7 --quiet-curl
rvm use 2.1.7 --default
ruby --version

# https://github.com/github/pages-gem
gem install github-pages
# sudo gem install github-pages --no-ri --no-rdoc

end_seconds="$(date +%s)"
echo "-----------------------------"
echo "Provisioning complete in "$(expr $end_seconds - $start_seconds)" seconds"
#echo "You can now use 'less -S +F $log' to monitor Jekyll."
