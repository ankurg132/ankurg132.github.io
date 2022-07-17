import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:carousel_slider/carousel_slider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ankur Gupta',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Ankur Gupta'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List data = ["flutter.png","gce.png","mlsa.png","gdsc.png","python.png"];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Stack(
            children: [
              Container(
                  alignment: Alignment.center,
                  child: Image.asset(
                    'intro.png',
                    fit: BoxFit.cover,
                    height: MediaQuery.of(context).size.height,
                    width: double.infinity,
                  )),
              Container(
                alignment: Alignment.center,
                height: MediaQuery.of(context).size.height,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          decoration: BoxDecoration(color: Colors.black54),
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Hello There,',
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                      fontSize: 30, color: Colors.white),
                                ),
                                const Text(
                                  'I\'m Ankur Gupta',
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                      fontSize: 50, color: Colors.white),
                                ),
                                Row(children: [
                                  IconButton(
                                    color: Colors.white,
                                    icon: Icon(Icons.email),
                                    onPressed: () {
                                      launchUrl(Uri.parse(
                                          'mailto:ankur@semikolan.co'));
                                    },
                                  ),
                                  IconButton(
                                    color: Colors.white,
                                    icon: FaIcon(FontAwesomeIcons.linkedin),
                                    onPressed: () {
                                      launchUrl(Uri.parse(
                                          'https://linkedin.com/in/ankurg132'));
                                    },
                                  ),
                                  IconButton(
                                    color: Colors.white,
                                    icon: FaIcon(FontAwesomeIcons.github),
                                    onPressed: () {
                                      launchUrl(Uri.parse(
                                          'https://github.com/ankurg132'));
                                    },
                                  ),
                                  IconButton(
                                    color: Colors.white,
                                    icon: FaIcon(FontAwesomeIcons.twitter),
                                    onPressed: () {
                                      launchUrl(Uri.parse(
                                          'https://twitter.com/ankurg132'));
                                    },
                                  ),
                                ]),
                              ],
                            ),
                          ),
                        ),
                        MediaQuery.of(context).size.width>800? SizedBox(
                          width: MediaQuery.of(context).size.width * 0.5,
                          child: CarouselSlider(
                            options: CarouselOptions(
                              autoPlay: true,
                              autoPlayInterval: const Duration(seconds: 5),
                              height: MediaQuery.of(context).size.height*0.3,
                              viewportFraction: 1,
                              scrollDirection: Axis.horizontal
                            ),
                            items: data.map((item) {
                              return GridTile(
                                  child:
                                      Image.asset(item,),
                              );
                            }).toList(),
                          ),
                        ):Container(),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          // Text(
          //   'Co-Founder @Semikolan, Github Campus Expert, Lead @GDSC UIT RGPV, MLSA',
          //   style: TextStyle(fontSize: 30),
          // ),
          // Text(
          //   'Flutter Developer, Python Developer, ML, DevOps and Open Source Enthusiast.',
          //   style: TextStyle(fontSize: 25),
          // ),
        ],
      ),
    ));
  }
}
