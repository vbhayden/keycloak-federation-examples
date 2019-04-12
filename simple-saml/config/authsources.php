<?php
$config = array(
    'admin' => array(
        'core:AdminPassword',
    ),
    'example-userpass' => array(
        'exampleauth:UserPass',
        'user1:user1pass' => array(
            'uid' => 'saml-user-1',
            'eduPersonAffiliation' => array('group1'),
            'email' => 'user1@example.com',
            'first-name' => 'SAML',
            'last-name' => 'One',
        ),
        'user2:user2pass' => array(
            'uid' => 'saml-user-2',
            'eduPersonAffiliation' => array('group2'),
            'email' => 'user2@example.com',
            'first-name' => 'SAML',
            'last-name' => 'Two',
        ),
        'user3:user3pass' => array(
            'uid' => 'saml-user-3',
            'eduPersonAffiliation' => array('group3'),
            'email' => 'user3@example.com',
            'first-name' => 'SAML',
            'last-name' => 'Three',
        ),
    ),
);
