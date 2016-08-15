
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

#  config.vm.box = "larryli/utopic32"
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "jekyll"
#  config.vm.box = "utopic-server-cloudimg-amd64-vagrant-disk1.box"
#  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/utopic/current/utopic-server-cloudimg-amd64-vagrant-disk1.box"

  # Fix the "ssh" forwarded port to be active on all interfaces.
  # (default is for 127.0.0.1 only)
  config.vm.network "forwarded_port", guest: 22, host: 2222, id: "ssh", auto_correct: true
  config.vm.network "forwarded_port", guest: 8888, host: 8888, auto_correct: true

  #config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.provision "shell", path: "bootscript.sh"

  config.ssh.forward_agent = true

end
