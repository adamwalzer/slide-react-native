//
//  FacebookInviteManager.m
//  slide
//
//  Created by Adam Walzer on 3/13/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "FacebookInviteManager.h"
#import "FBSDKCoreKit/FBSDKCoreKit.h"
#import "FBSDKShareKit/FBSDKShareKit.h"

@implementation FacebookInviteManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show:(RCTResponseSenderBlock)callback) {
  FBSDKAppInviteContent *content =[[FBSDKAppInviteContent alloc] init];
  content.appLinkURL = [NSURL URLWithString:@"http://thataw.com/slide/play/"];
  //optionally set previewImageURL
  content.appInvitePreviewImageURL = [NSURL URLWithString:@"http://thataw.com/slide/play/images/logo.svg"];
  
  // present the dialog. Assumes self implements protocol `FBSDKAppInviteDialogDelegate`
  [FBSDKAppInviteDialog showWithContent:content
                               delegate:self];
};

@end
