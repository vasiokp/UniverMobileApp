package com.univermobileapp;

import com.reactnativenavigation.controllers.SplashActivity;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

public class MainActivity extends SplashActivity {
  @Override
  public LinearLayout createSplashLayout(){
    LinearLayout view = new LinearLayout(this);
    TextView textView = new TextView(this);
    textView.setBackgroundColor(Color.parseColor("#F89554"));
    textView.setGravity(Gravity.CENTER);
    textView.setTextColor(Color.parseColor("#ffffff"));
    textView.setText("Univer app");
    textView.setGravity(Gravity.CENTER);
    textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP,40);
    view.addView(textView);
    return view;
  }
}
