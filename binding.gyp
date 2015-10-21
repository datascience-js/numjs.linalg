{
  "targets": [
    {
      "target_name": "numjs.linalg",
      "sources": [ "numjs.linalg.cpp" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
		"..\\eigen-eigen-10219c95fe65\\"
      ]
    }
  ]
}
